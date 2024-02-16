<?

namespace App\Services;

use Session;
use Http;

class AuthWialon
{
    private static $instance;
    private $token = '94e3f3e1ac97def632645f3655f7c9325FBF8B37B9070360D58D2FC728179D2C5ABA96B9';
    private $baseUrl = 'http://wl.ngmk.uz/wialon/ajax.html';


    function __construct()
    {
        if (Session::get('eid') == null) $this->login();
    }

    public static function getInstance()
    {
        if (!self::$instance) self::$instance = new self();

        return self::$instance;
    }

    public function sid()
    {
        return Session::get('eid');
    }

    public function get($object){

        $resdata = $this->quest($object);
        if (isset($resdata['error']) && $object['svc'] != 'token/login') {
            $this->login();
            $resdata = $this->quest($object);
        }

        return $resdata;
    }

    function quest($object){
        $response = Http::get($this->baseUrl, [...$object,'sid' => $this->sid()]);
        return $response->json();
    }

    private function login(){
        $data = $this->get([
            'svc' => 'token/login',
            'params' => json_encode([
                "token" => $this->token,
            ]),
        ]);

        Session::put('eid', $data['eid']);
        Session::save();
    }

}