<template>
    <div>
        <main>
            <div class="container max-w-md mx-auto py-12">
                <h1 class="mb-8 text-2xl font-bold">aCoherentJourney Sound Generator</h1>
                <div class="bg-gray-50 rounded-xl p-8">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-8 flex flex-col gap-4">
                            <div class="bg-gray-100 p-6 rounded-xl inline-block">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Choose a frequency</label>
                                <input class="block" v-model="frequency" type="range" min="2000" max="20000">
                                <p>{{ frequency }}</p>
                            </div>
                            <div class="bg-gray-100 p-6 rounded-xl inline-block">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Choose a waveform</label>
                                <div class="flex gap-2">
                                    <input class="block" v-model="waveform" value="sine" type="radio" name="waveform">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Sine</label>
                                </div>
                                <div class="flex gap-2">
                                    <input class="block" v-model="waveform" value="square" type="radio" name="waveform">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Square</label>
                                </div>
                                <div class="flex gap-2">
                                <input class="block" v-model="waveform" value="saw" type="radio" name="waveform">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Saw</label>
                            </div>
                                <p>{{ waveform }}</p>
                            </div>
                            <div class="bg-gray-100 p-6 rounded-xl inline-block">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="frequency">Choose a duration</label>
                                <input class="block" v-model="duration" type="range" min="1" max="10">
                                <p>{{ duration }}</p>
                            </div>
                        </div>
                        <div>
                            <button class="bg-green-800 text-green-200 py-4 px-4 rounded-xl" type="submit">Generate preview</button>
                            <pre>{{ audioData }}</pre>
                            <audio controls  ref="audioPlayer" src=""></audio>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        <button @click="callBackend">Call backend</button>
    </div>
</template>
<script setup lang="ts">
import {FormData} from "node-fetch-native";
import {useFetch} from "#app";

const frequency = ref('10000')
const waveform = ref('sine')
const duration = ref('1')
const apiUrl = 'http://127.0.0.1:5000/preview'
const audioPlayer = ref()

const isPending = ref(false)
const audioData = ref()

async function handleSubmit() {
    const formData = new FormData()
    formData.append("frequency", frequency.value)
    formData.append("waveform", waveform.value)
    formData.append("duration", duration.value)

    fetch(apiUrl, {method: 'POST', body: formData})  // Send a request to the Flask server to generate the sound
        .then(response => response.blob())  // Convert the response to a blob object
        .then(blob => {
            const audioElement = document.createElement('audio');
            audioElement.src = URL.createObjectURL(blob);  // Create an object URL from the blob
            audioElement.controls = true
            document.body.appendChild(audioElement);  // Append the audio element to the body of the HTML document
        });
}

const config = useRuntimeConfig()
async function callBackend() {
    const { data } = useFetch(config.public.backendUrl)
    console.log(data)
}

</script>
