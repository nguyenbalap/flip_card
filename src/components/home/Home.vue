<template>
    <div id="flashcard-app" class="container">
        <h1>Flashcard App!</h1>
        <div class="flex_button">
            <button @click="() => startGame(2)">2 x 2</button>
            <button @click="() => startGame(3)">2 x 3</button>
            <button @click="() => startGame(4)">2 x 4</button>
            <button @click="() => startGame(6)">3 x 4</button>
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