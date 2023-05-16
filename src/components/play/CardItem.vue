<template>
    <div id="flashcard-app" class="container">
        <h1>Flashcard App!</h1>
        <ul class="flashcard-list">
          <li @click="() => toggleCard(card, index)" v-for="(card, index) in cards" :style="{width: `${(100 / level)}` + '%'}">
            <Transition>
              <p v-bind:key="card.flipped" class="card">
                
                    <img :src="`src/assets/images/${card.id}.png`" alt="card_back" v-if="card.flipped" />
                    <img src='@/assets/images/front_card.jpg' alt="card_front" v-else/>
              </p>
            </Transition>
          </li>
        </ul>
      </div>
</template>
<script>
import cardsJSON from "@/data/cards.json"
export default {
    data() {
        return {
            cards: null,
            prevIndex: null,
            level: null,
            count: 0,
            result: [],
            time_start: null 
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
                    this.result.push(card.id)
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
    //     card_obj: function() {

    //     }
    // },
    mounted() {
        this.level = this.$route.params.level
        this.time_start = performance.now()
        if (![2, 4,6,8].includes(parseInt(this.level))) {
            alert("Nhập linh tinh cc")
            this.$router.push('/')
        }
        const data = this.shuffleArray(cardsJSON).filter((val, index) => {
            if (index > this.level * this.level / 2 - 1) {
                return;
            }
            return val
        })
        this.cards = JSON.parse(JSON.stringify(this.shuffleArray(data.flatMap((val) => [val, val]))))
    },
    watch: {
        prevIndex(val) {
            if (this.result.length == this.cards.length / 2){
                var t1 = performance.now();
                setTimeout(() => {
                    alert("To victory took " + ((t1 - this.time_start)/1000).toFixed(2) + " seconds.")
                    this.$router.push('/')
                }, 500)
            }
        }
    }
}
</script>