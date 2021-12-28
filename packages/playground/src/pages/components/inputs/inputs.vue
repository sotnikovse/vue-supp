<script lang="ts" setup>
import { ref } from 'vue'
import TextInput from '@/components/TextInput/TextInput.vue'
import Textarea from '@/components/Textarea/Textarea.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'
import Switch from '@/components/Switch/Switch.vue'
import Radio from '@/components/Radio/Radio.vue'
import editSvg from '@/assets/icons/edit.svg'

const model = ref({
  field1: '',
  field2: '',
  field3: '',
  field4: false,
  field5: false,
  field6: '',
})
const disabled = ref(false)
const error = ref(false)
</script>

<template>
  <div class="text-gray-700 space-x-4">
    <Checkbox v-model="disabled">Disabled</Checkbox>
    <Checkbox v-model="error">Error</Checkbox>
  </div>

  <div class="mt-4 space-y-4">
    <TextInput
      v-model="model.field1"
      :disabled="disabled"
      :error="error"
      placeholder="Field 1"
    />
    <pre class="text-sm"
      >{{ model.field1 }}
    </pre>
    <TextInput
      v-model="model.field2"
      :disabled="disabled"
      :error="error"
      placeholder="Field 2"
    >
      <template #append>
        <editSvg class="w-6 h-6" />
      </template>
    </TextInput>
    <pre class="text-sm"
      >{{ model.field2 }}
    </pre>
  </div>

  <div class="mt-4">
    <Textarea
      v-model="model.field3"
      :disabled="disabled"
      :error="error"
      placeholder="Field 3"
    />
    <pre class="text-sm mt-4"
      >{{ model.field3 }}
    </pre>
  </div>

  <div class="mt-4">
    <Checkbox v-model="model.field4" :disabled="disabled">Checkbox 1</Checkbox>
    <pre class="text-sm mt-4"
      >{{ model.field4 }}
    </pre>
  </div>

  <div class="mt-4">
    <Switch v-model="model.field5" :disabled="disabled">Switch 1</Switch>
    <pre class="text-sm mt-4"
      >{{ model.field5 }}
    </pre>
  </div>

  <div class="mt-4">
    <div class="flex flex-col space-y-2">
      <Radio
        v-for="n in 3"
        v-model="model.field6"
        :value="`val-${n}`"
        :disabled="disabled"
      >
        Val {{ n }}
      </Radio>
    </div>
    <pre class="text-sm mt-4"
      >{{ model.field6 }}
    </pre>
  </div>
</template>
