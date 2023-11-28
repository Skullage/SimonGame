<template>
  <div id="app">
    <h1>Simon Says</h1>
    <div class="content">
      <div class="btns-wrapper">
        <BaseButton @click="click(index)" v-for="index in 4" :key="index" :bgcolor="bgcolors[index - 1]" :ref="`btn${index}`" :sound="`${index}.mp3`" :timeout-time="timeoutTimer" :disabled="!isPlayerTurn" />
      </div>
      <div class="menu">
        <div class="round">
          Round: {{ round }}
        </div>
        <button @click="startGame">Start</button>
        <p v-if="isLooseGame">К сожалению, вы проиграли.</p>
        <h2 class="game-options">
          Game Options:
        </h2>
        <div>
          <base-radio-button-group :options="difficulties" name="difficult" v-model="timeoutTimer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BaseButton from "@/components/BaseButton.vue";
import BaseRadioButtonGroup from "@/components/BaseRadioButtonGroup.vue";

export default {
  name: 'App',
  components: {
    BaseRadioButtonGroup,
    BaseButton
  },
  data() {
    return {
      difficulties: [{label: 'Легкий', value: 1500}, {label: 'Средний', value: 1000}, {label: 'Сложный', value: 400}],
      round: 0,
      bgcolors: ['blue', 'red', 'yellow', 'green'],
      hiddenArray: [],
      isPlayerTurn: false,
      turn: 0,
      timeoutTimer: 1500,
      isLooseGame: false
    }
  },
  methods: {
    click(index) {
      if(this.hiddenArray[this.turn] !== index) {
        return this.loseGame();
      }
      this.turn++;
      if(this.turn === this.hiddenArray.length) {
        this.isPlayerTurn = false;
        setTimeout(() => {
          this.nextRound()
        }, this.timeoutTimer)

      }
    },
    startGame() {
      this.resetGame();
      this.addElementToHiddenArray();
      this.showCombination();
      this.isPlayerTurn = true;
    },
    getRandomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
    showCombination() {
      for(let i = 0; i < this.hiddenArray.length; i++) {
        setTimeout(() => {
          this.$refs['btn' + this.hiddenArray[i]][0].clickBtn();
        }, i * this.timeoutTimer)
      }
    },
    loseGame() {
      this.resetGame();
      this.isLooseGame = true;
    },
    resetGame() {
      this.isLooseGame = false;
      this.round = 0;
      this.isPlayerTurn = false;
      this.turn = 0;
      this.hiddenArray.length = 0;

    },
    addElementToHiddenArray() {
      this.hiddenArray.push(Math.round(this.getRandomNumber(1, 4)))
    },
    nextRound() {
      this.round++;
      this.turn = 0;
      this.addElementToHiddenArray();
      this.showCombination();
      this.isPlayerTurn = true;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: grid;
  padding: 2rem 1rem;
  place-content: center;
}
.content {
  display: flex;
  gap: 6rem;
  flex-wrap: wrap;
  justify-content: center;
}
.btns-wrapper {
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
}
.round {
  font-weight: 700;
  margin-bottom: 2rem;
}
</style>
