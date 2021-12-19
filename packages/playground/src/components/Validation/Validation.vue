<script lang="ts" setup>
import { makeValidationProps, useValidation } from 'vue-supp'

const props = defineProps(makeValidationProps())

const validation = useValidation(props)
</script>

<template>
  <slot :validation="validation" />
</template>
