<template>
    <button v-show="showScroll" @click="scrollToTop" class="scroll-to-top" title="Go to top">Top</button>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'ScrollToTop',

    created () {
        /*Adding EventListener on scrolling*/
        window.addEventListener('scroll', this.onScroll);
    },

    setup() {
        let showScroll = ref(false);

        /* Displaying goto Top button */
        const onScroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                showScroll.value = true;
            } else {
                showScroll.value = false;
            }
        }

        /* Scrolling to top of the page*/
        const scrollToTop = function() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        return{ showScroll, scrollToTop, onScroll }
    }
}
</script>

<style lang="less" scoped>
.scroll-to-top {
  display: block;    
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: lightblue;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  &:hover {
    background-color: #a0c3ce;
    }
}
</style>