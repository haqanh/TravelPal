<template>
    <div class="background">
        <div class="flex-col">
            <label for="generalAdvice"></label>
            <input type="text" class="input" id="generalAdvice" placeholder="Write an Advice" name="generalAdvice" rows="5" cols="40"/>
        </div>
        <br>

        <div class="flex justify-end">
            <button>
                Add Input
            </button>
        </div>

    </div>
</template>

<style>
.background {
    @apply flex bg-gray-500 p-4 bg-opacity-10 rounded-[10px] shadow 
}

.input {
    @apply px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
}
</style>