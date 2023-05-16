<template>
    <div id="flashcard-app" class="container">
        <h1>Flashcard App!</h1>
        <div class="flex_button">
            <button @click="() => startGame(2)">2 x 2</button>
            <button @click="() => startGame(4)">4 x 4</button>
            <button @click="() => startGame(6)">6 x 6</button>
            <button @click="() => startGame(8)">8 x 8</button>
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