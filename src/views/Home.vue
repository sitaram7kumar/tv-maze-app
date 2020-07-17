<template>
  <div class="home">
    <div class="search-bar">
      <input 
        type="text"
        class="search-input"
        placeholder="Search for tv shows.."
        title="Type in a name and hit Enter"
        v-model="searchString"
      />
      <select class="search-input" v-model="selectedGenre">
        <option selected value="">All Genres</option>
        <option v-for="genre in allGenre" :value="genre" :key="genre">{{genre}}</option>
      </select>
    </div>
    <suspense>
      <template #default>
        <AllShows 
          :selectedGenre="selectedGenre"
          :searchString="searchString"
        />
      </template>
      <template #fallback>
        <span>Loading....</span>
      </template>
    </suspense>
    <ScrollToTop />
  </div>
</template>

<script>
import AllShows from '@/components/AllShows.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

/*Returns all genres with no duplicates*/
const getAllGenres = function(data) {
  let allGenres = data.map(s => s.genres.join());
  allGenres = allGenres.join().split(',');
  allGenres = allGenres.filter(g => g.length);

  return [...new Set(allGenres)];

}

export default {
  name: 'Home',
  components: {
    AllShows, ScrollToTop
  },

  setup() {
    const store = useStore();
    const allGenre = computed(() => getAllGenres(store.state.tvShows));
    const selectedGenre = ref('');
    const searchString = ref('');

    return { allGenre, selectedGenre, searchString }
  }
  
}
</script>

<style lang="less" scoped>
.home{
  .search-bar {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 769px) {
      display: flex;
      flex-flow: row;
    }
    .search-input {
      display: block;
      width: 30%;
      height: 30px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
      } 
    }
    select.search-input {
      margin: 2% 0;
      width: calc(30% + 24px);
      @media (min-width: 769px) {
        width: 15%;
        margin-left: 2%;
      }
    }
  }
}
</style>
