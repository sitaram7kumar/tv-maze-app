<template>
    <span>
        <p v-if="error">{{error}}</p>
        <div class="gallery-box" v-if="!error && tvShows.length">
            <Show v-for="show in tvShows" :details="show" :key="show.id" />
        </div>
    </span>
</template>

<script>
    import { defineAsyncComponent, computed } from 'vue';
    import { useStore } from 'vuex';

    /* Loading componrnt Asynchronously */
    const Show = defineAsyncComponent({
        loader: () => import('@/components/Show.vue'),
        suspensible: false
    })

    export default {
        name: 'Users',
        components: { Show },
        created: function() {
            if(!this.tvShows.length){
                this.dispatchAction('loadTvShows');
            }
        },

        watch: {
            searchString: function(v) {
                if(v.trim().length){
                    this.dispatchAction('updateTvShows', v);
                } else {
                    this.dispatchAction('loadTvShows');
                }
            }
        },
        
        async setup(props) {
            const store = useStore();
            const error = computed(() => store.state.error);
            const tvShows = computed(() => store.state.tvShows.filter(s => !props.selectedGenre.length || s.genres.find(g => g == props.selectedGenre)));

            function dispatchAction(name, payload = null) {
                store.dispatch(name, payload);
            }

            return { tvShows, error, dispatchAction }
        },

        props: {
            selectedGenre: {
                type: String,
                default: ''
            },
            searchString: {
                type: String,
                default: ''
            }
        } 
    }
</script>

<style lang="less" scoped>
    .gallery-box {
        display: flex;
        flex-flow: wrap;
        align-items: center;
        justify-content: center;
        padding: 2%;
    }
</style>