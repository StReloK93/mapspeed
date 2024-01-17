<template>
    <section class="w-[330px] bg-[#14284a] h-full z-30 p-3 relative text-white">
        <Transports :UIData="UIData" />
        <p>Oldingi necha kun bilan berilgan muddatni solishtirsin</p>
        <select v-model="appStore.oldDays" class="text-gray-700 w-full">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
        <p>Berilgan muddatdan nechi soat oldin</p>
        <select v-model="appStore.hourPeriod" class="text-gray-700 w-full">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
        <p>Tezlik farqi</p>
        <select v-model="appStore.speedRange" class="text-gray-700 w-full">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
        </select>
        <p>
            Boshlangich vaqt
        </p>
        <input type="datetime-local" v-model="appStore.selectedTime" class="text-gray-700 w-full">
        <h3 class="text-indigo-100 font-semibold py-2">Tezlik tushgan nuqtalar (Km/s)</h3>
        <PointsList :custom-wialon="UIData.customWialon"/>
    </section>
</template>

<script setup lang="ts">
import Transports from './Transports.vue'
import PointsList from './PointsList.vue'
import { useAppStore } from '@/store/useAppStore'
const { UIData } = defineProps([ 'UIData'])

const appStore = useAppStore()
</script>