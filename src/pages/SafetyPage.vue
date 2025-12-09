<script setup>

import {onMounted, useTemplateRef} from "vue";

const video = useTemplateRef('video');

const mseQueue = []
let mseSourceBuffer
let mseStreamingStarted = false

function startPlay (url) {
  const mse = new MediaSource()
  video.value.src = window.URL.createObjectURL(mse)
  mse.addEventListener('sourceopen', function () {
    const ws = new WebSocket(url)
    ws.binaryType = 'arraybuffer'
    ws.onopen = function () {
      console.log('Connect to ws')
    }
    ws.onmessage = function (event) {
      const data = new Uint8Array(event.data)
      if (data[0] === 9) {
        let mimeCodec
        const decodedArr = data.slice(1)
        mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
        mseSourceBuffer = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
        mseSourceBuffer.mode = 'segments'
        mseSourceBuffer.addEventListener('updateend', pushPacket)
      } else {
        readPacket(event.data)
      }
    }
  }, false)
}

function pushPacket () {
  let packet

  if (!mseSourceBuffer.updating) {
    if (mseQueue.length > 0) {
      packet = mseQueue.shift()
      mseSourceBuffer.appendBuffer(packet)
    } else {
      mseStreamingStarted = false
    }
  }
  if (video.value.buffered.length > 0) {
    if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
      video.value.currentTime = video.value.buffered.end((video.value.buffered.length - 1)) - 0.5
    }
  }
}

function readPacket (packet) {
  if (!mseStreamingStarted) {
    mseSourceBuffer.appendBuffer(packet)
    mseStreamingStarted = true
    return
  }
  mseQueue.push(packet)
  if (!mseSourceBuffer.updating) {
    pushPacket()
  }
}

onMounted(() => {
  // fix stalled video in safari
  video.value.addEventListener('pause', () => {
    if (video.value.currentTime > video.value.buffered.end(video.value.buffered.length - 1)) {
      video.value.currentTime = video.value.buffered.end(video.value.buffered.length - 1) - 0.1
      video.value.play()
    }
  })

  startPlay('ws://localhost:8083/stream/channel01/channel/0/mse?uuid=channel01&channel=0')
});
</script>

<template>
  <q-page class="flex flex-center q-px-lg q-pb-lg">
    <video ref="video" autoplay muted playsinline controls>
      Your browser doesn't support RTSP streams.
    </video>
  </q-page>
</template>

<style scoped lang="scss">

</style>
