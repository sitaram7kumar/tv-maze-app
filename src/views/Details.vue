<template>
    <div class="details" v-if="!loading && details">
        <div class="details-image">
            <figure v-if="details.image">
                <img :src="details.image.original" />
            </figure>
        </div>
        <div class="details-info">
            <h1>
                <a :href="details.officialSite" target="_blank"> {{ details.name }}</a>
            </h1>
            <small>{{ details.language}} {{ ' | ' + details.genres.join(',')}} {{ ' | ' + details.type }}</small>
            <p class="price">Rating: {{ details.rating.average }}</p>
            <p class="price">
                Schedule: [ 
                <label v-for="(v, k, index) in details.schedule" :key="k">
                    {{ k }}: {{ v }} {{ Object.keys(details.schedule).length > index + 1 ? ', ' : ''}} 
                </label> ]
            </p>
            <p>
                <label>Externals: </label>
                [<label v-for="(v, k, index) in details.externals" :key="k">
                    {{ k }}: {{ v }} {{ Object.keys(details.externals).length > index + 1 ? ', ' : ''}} 
                </label>]
            </p>
            <p v-html="details.summary"></p>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import axios from 'axios'


export default {
    mounted() {
        this.getDetails();
    },
    setup() {
        let details = ref(null);
        let loading = ref(false);
        let error = ref(null);
        const route = useRoute();
        const params = computed(() => route.params);
        
        /*Fetching single show details with showId*/
        function getDetails() {
            loading.value = true;
            axios.get(`/shows/${params.value.showid}`)
                .then((res) => {
                details.value = res.data;
            }).catch(e => {
                error.value = e;
            })
            .finally(() => loading.value = false);
        }

        return { details, params, getDetails, loading, error }
    }
}
</script>

<style lang="less" scoped>
    .details {
        display: flex;
        flex-flow: column;
        @media (min-width: 769px) {
            flex-flow: row;
        }
        .details-image {
            img{
                width: 60%;
                @media (min-width: 769px) {
                    width: 100%;
                }
            }
        }
        .details-info {
            text-align: left;
            font-size: 14px;
        }
    }
</style>