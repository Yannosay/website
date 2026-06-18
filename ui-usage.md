# UI Usage Examples

---

## VerticalProgressBar.vue

### Basic usage:

```vue
<template>
  <VerticalProgressBar 
    :bars="[
      { name: 'HTML', percentage: 50, color: '#f6e149' },
      { name: 'CSS', percentage: 90, color: '#7ad145' },
      { name: 'JS', percentage: 40, color: '#f47374' }
    ]" 
  />
</template>
```

### With custom default color:

```vue
<template>
  <VerticalProgressBar 
    :bars="[
      { name: 'Vue', percentage: 85 },
      { name: 'React', percentage: 70 },
      { name: 'Angular', percentage: 45 }
    ]"
    default-color="#4a90e2"
  />
</template>
```
Dynamic usage with v-for:

```vue
<template>
  <VerticalProgressBar :bars="skillBars" />
</template>

<script setup>
import { ref } from 'vue'

const skillBars = ref([
  { name: 'HTML', percentage: 50, color: '#f6e149' },
  { name: 'CSS', percentage: 90, color: '#7ad145' },
  { name: 'JavaScript', percentage: 75, color: '#f0db4f' },
  { name: 'Vue', percentage: 85, color: '#42b883' }
])
</script>
```

### With calculated percentages:

```vue
<template>
  <VerticalProgressBar :bars="progressBars" />
</template>

<script setup>
import { computed } from 'vue'

const completedTasks = ref(25)
const totalTasks = ref(50)

const progressBars = computed(() => [
  { name: 'Tasks', percentage: (completedTasks.value / totalTasks.value) * 100, color: '#4caf50' }
])
</script>
```