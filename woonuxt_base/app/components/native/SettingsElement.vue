<script setup lang="ts">
const props = defineProps({
    header: {
        type: String as PropType<string>,
        required: true,
    },
    label: {
        type: String as PropType<string>,
        required: false,
    },
    prefixIcon: {
        type: String as PropType<string>,
        required: true,
    },
    
    suffixIcon: {
        type: String as PropType<string>,
        required: true,
    },
});
</script>

<template>
    <div
        class="font-semibold cursor-pointer h-10 flex justify-between items-center px-2"
        @click="$emit('click')"
    >
        <div class="flex gap-2 items-center">
            <SvgIcon
                :icon="prefixIcon"
                class="text-xl"
            />
            <div>
                {{ header }}
            </div>
        </div>

        <div>
            <div class="flex gap-4">
                <div class="font-normal text-gray-400">
                    {{ label }}
                </div>
                <SvgIcon
                    :icon="suffixIcon"
                    class="text-xl"
                />
            </div>
        </div>
    </div>
</template>
