<template>
    <div id="flashcard-app" class="container">
        <h1>Flashcard App!</h1>
        <ul class="flashcard-list">
          <li @click="toggleCard(card, index)" v-for="(card, index) in cards">
            <Transition>
              <p v-bind:key="card.flipped" class="card">
                    <img :src="card.back" alt="card_back" v-if="card.flipped" />
                    <img :src="image" alt="card_front" v-else/>
              </p>
            </Transition>
          </li>
        </ul>
      </div>
</template>
<script>
import cardsJSON from "../../data/cards.json"
import front_card from "../../assets/front_card.jpg"
import { toRaw } from "vue";
export default {
    data() {
        return {
            cards: null,
            prevIndex: null,
            level: null,
            count: 0,
            image: front_card
        }
    },
    methods: {
        toggleCard: function(card, index) {
            if (card.disable) {
                return;
            }
            
            this.count++;
            if (this.count > 2) {
                return;
            }

            if (this.prevIndex === null) {
                card.flipped = !card.flipped;
                card.disable = true;
                this.prevIndex = index
            } else {
                if (this.cards[this.prevIndex].id === card.id) {
                    card.flipped = !card.flipped;
                    card.disable = true;
                    this.prevIndex = null;
                    this.count = 0;
                } else {
                    card.flipped = !card.flipped;
                    setTimeout(() => {
                        this.cards[this.prevIndex].disable = false;
                        this.cards[this.prevIndex].flipped = !this.cards[this.prevIndex].flipped;
                        card.flipped = false;
                        this.prevIndex = null;
                        this.count = 0;
                    }, 1000)
                }
            } 
        },
        shuffleArray: function(list) {
            return list.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
        }
    },
    // computed: {
    //     random_item: function() {
    //         return this.shuffleArray(this.cards)
    //     }
    // },
    mounted() {
        this.level = this.$route.params.level
        if (![2,3,4,6].includes(parseInt(this.level))) {
            alert("Nhập linh tinh cc")
            this.$router.push('/')
        }
        const data = this.shuffleArray(cardsJSON).filter((val, index) => {
            if (index > this.level - 1) {
                return;
            }
            return val
        })
        this.cards = JSON.parse(JSON.stringify(data.flatMap((val) => [val, val])))
    }
}
</script>