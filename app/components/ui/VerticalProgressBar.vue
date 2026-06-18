<template>
  <div class="progress">
    <div
      v-for="(bar, index) in bars"
      :key="index"
      class="bar"
      :style="{
        height: `calc(150px * ${bar.percentage / 100})`,
        background: `linear-gradient(${bar.color || defaultColor}, transparent 100%)`
      }"
    >
      <div class="text">
        <span>{{ bar.name }}</span>
        {{ bar.percentage }}%
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bars: {
    type: Array,
    required: true,
    validator: (value) => {
      if (!Array.isArray(value)) return false
      return value.every(bar => 
        bar && 
        typeof bar.name === 'string' && 
        typeof bar.percentage === 'number' &&
        bar.percentage >= 0 &&
        bar.percentage <= 100
      )
    }
  },
  defaultColor: {
    type: String,
    default: '#888888'
  }
})
</script>

<style scoped>
.progress {
  width: 280px;
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.bar {
  width: 75px;
  border-radius: 3mm;
  position: relative;
  animation: progress 1s ease-out;
  transition: all 0.3s ease;
}

.text {
  position: absolute;
  top: -70px;
  left: 50%;
  width: 100%;
  height: fit-content;
  transform: translate(-50%, 0);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  white-space: nowrap;
}

.text span {
  font-weight: 200;
  font-size: 11px;
  opacity: 0.8;
}

.bar::before {
  position: absolute;
  content: "";
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  z-index: 1;
}

.text::before {
  position: absolute;
  content: "";
  bottom: -55px;
  left: 50%;
  transform: translate(-50%, 0);
  background: linear-gradient(transparent 1%, rgb(255, 255, 255));
  border-radius: 0.5mm;
  width: 1px;
  height: 55px;
}

@keyframes progress {
  from {
    height: 0;
  }
}

.bar:hover::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3mm;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.4) 0,
    rgba(255, 255, 255, 0.4) 0.4mm,
    transparent 0.4mm,
    transparent 1.2mm
  );
  animation: move 5s linear infinite;
  background-size: 200% 100%;
  pointer-events: none;
}

@keyframes move {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.bar:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>