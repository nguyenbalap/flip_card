<template>
    <div id="flashcard-app" class="container">
        <h1>Flashcard App!</h1>
        <div class="flex_button">
            <button @click="() => startGame('easy')">2 x 2 (easy)</button>
            <button @click="() => startGame('normal')">4 x 4 (normal)</button>
            <button @click="() => startGame('medium')">6 x 6 (medium)</button>
            <button @click="() => startGame('hard')">8 x 8 (hard)</button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        startGame(len) {
            this.$router.push({
                name: 'play',
                params: { level: len }
            });
        }
    }
}
</script>