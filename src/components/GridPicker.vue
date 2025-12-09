<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps({
  cols: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  entries: {
    type: Array,
    required: true,
  }
})

function calcBackgroundStyle(entry) {
  if (!entry?.background) return {};
  return {
    'background-image': `url('${entry.background}')`
  }
}

function calcButtonContentClasses(entry) {
  return [
    'full-width full-height border-radius-buttons flex column absolute q-pa-sm',
    {
      'justify-center': !entry?.background,
      'justify-end': entry?.background,
      'items-center': !entry?.background,
      'items-start': entry?.background
    }
  ];
}

const holdingTimeouts = {};
const heldPendingRelease = {};

function buttonDown(event, entry, idx) {
  if (entry?.disable || !entry?.touchHold || event?.pointerType !== 'touch') {
    return;
  }

  let pressProgressEl = event.target?.closest('.q-btn__content')
    ?.querySelector('.button-press-progress');

  holdingTimeouts[idx] = setTimeout(() => {
    if (holdingTimeouts[idx]) {
      clearTimeout(holdingTimeouts[idx]);
      holdingTimeouts[idx] = undefined;
      heldPendingRelease[idx] = true;
      pressProgressEl?.classList?.add('button-press-progress-pending');
    }
  }, 500);

  pressProgressEl?.classList?.add('button-press-progress-pressing');
}

function buttonUp(event, entry, idx) {
  if (holdingTimeouts[idx]) {
    clearTimeout(holdingTimeouts[idx]);
    holdingTimeouts[idx] = undefined;
  }

  let pressProgressEl = event.target?.closest('.q-btn__content')
    ?.querySelector('.button-press-progress');

  if (!entry.disable && (!entry?.touchHold || event?.pointerType !== 'touch' || heldPendingRelease[idx])) {
    heldPendingRelease[idx] = undefined;
    setTimeout(() => {
      handleButton(entry);
    }, 100);
    return;
  }

  pressProgressEl?.classList?.remove('button-press-progress-pressing');
  pressProgressEl?.classList?.remove('button-press-progress-pending');
}

function handleButton(entry) {
  if (entry.onClick) {
    entry.onClick();
  } else if (entry.to) {
    router.push(entry.to);
  } else if (entry.href) {
    window.location.href = entry.href;
  }
}

function buttonContextMenu(event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  return false;
}
</script>

<template>
  <div class="parent">
    <template v-for="(entry, idx) in entries"
              :key="idx">
      <q-btn
        v-if="Object.keys(entry).length > 0"
        class="full-height full-width border-radius-buttons relative-position q-pa-none"
        no-caps
        :outline="entry?.style === 'outline'"
        :flat="entry?.style === 'flat'"
        :glossy="entry?.style === 'glossy'"
        :push="entry?.style === 'push'"
        :disable="entry?.disable === true"
        :color="entry?.color"
        :text-color="entry?.textColor"
        @pointerdown="event => buttonDown(event, entry)"
        @pointerup="event => buttonUp(event, entry)"
        @pointercancel="event => buttonUp(event, entry)"
        @contextmenu="buttonContextMenu"
      >
        <div v-if="entry?.background" class="full-width full-height border-radius-buttons absolute background-container">
          <div class="full-width full-height background" :style="calcBackgroundStyle(entry)"></div>
        </div>
        <div v-if="entry?.background" class="full-width full-height border-radius-buttons absolute background-overlay"></div>
        <div v-if="entry?.touchHold" class="full-width full-height border-radius-buttons absolute button-press-progress">
          <div class="full-height absolute bg-black button-press-progress-bar"></div>
          <div class="full-height full-width absolute button-press-progress-text">
            <div :class="['full-height full-width flex column justify-end q-px-md q-py-sm text-subtitle1 text-weight-bold', entry?.background && (entry?.label || entry?.iconInline) ? 'items-end' : 'items-center']">
              <div class="button-press-progress-text-content button-press-progress-text-normal">
                <q-icon name="mdi-gesture-tap-hold" class="q-mr-xs"/>
                <span>HOLD</span>
              </div>
              <div class="button-press-progress-text-content button-press-progress-text-pending">
                <q-icon name="mdi-hand-back-right" size="xs" class="q-mr-xs"/>
                <span>RELEASE</span>
              </div>
            </div>
          </div>
        </div>
        <div :class="calcButtonContentClasses(entry)">
          <q-icon v-if="entry?.icon" :name="entry.icon" size="64px" class="q-mb-sm"/>
          <div class="flex items-baseline">
            <q-icon v-if="entry?.iconInline" :name="entry.iconInline" size="64px" class="q-mr-sm"/>
            <h3 v-if="entry?.label" class="q-ma-none q-pa-none">{{entry?.label}}</h3>
          </div>
        </div>
      </q-btn>
      <q-btn
        v-else
        class="full-height full-width"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.parent {
  display: grid;
  grid-template-columns: repeat(v-bind(cols), 1fr);
  grid-template-rows: repeat(v-bind(rows), 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding: 10px;
}

.border-radius-buttons {
  border-radius: 10px;
}

.background-container {
  overflow: hidden;
}

.background {
  background-repeat: no-repeat;
  background-size: cover;
}

.button-press-progress > .button-press-progress-bar {
  opacity: 0.5;
  width: 0;
  transition: width 100ms linear;
}

.button-press-progress-pressing > .button-press-progress-bar {
  width: 100%;
  transition: width 500ms linear;
}

.button-press-progress-pending > .button-press-progress-bar {
  animation: opacity-pulse 2s linear infinite;
}

@keyframes opacity-pulse {
  from { opacity: 0.5; }
  50% { opacity: 0.6; }
  to { opacity: 0.5; }
}

.button-press-progress-text-content {
  justify-content: center;
  align-items: baseline;
}

.button-press-progress-text-normal {
  display: flex;
}

.button-press-progress-text-pending {
  display: none;
}

.button-press-progress-pending > .button-press-progress-text > div > .button-press-progress-text-normal {
  display: none;
}

.button-press-progress-pending > .button-press-progress-text > div > .button-press-progress-text-pending {
  display: flex;
}

.background-overlay {
  background: linear-gradient(0deg, #000000aa 30%, #ffffff44 100%);
}

button:disabled {
  filter: brightness(50%);
}
</style>
