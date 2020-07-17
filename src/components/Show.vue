<template>
    <div class="gallery" v-if="details">
        <router-link :to="`/details/${details.id}`" class="gallery-item">
            <img v-if="details.image" :src="details.image.medium" alt="Forest" width="200" height="200">
            <div class="no-image" v-else><span>No Image</span></div>
            <div class="desc" :title="details.name">{{details.name}}</div>
            <p class="show-genres">{{details.genres.join(', ')}}</p>
        </router-link>
    </div>
</template>

<script>
export default {
    props:{
        details: {
            type: Object,
            default: () => null,
        }
    }
}
</script>

<style lang="less" scoped>
    div.gallery {
        margin: 5px;
        border: 1px solid #ccc;
        float: left;
        width: 200px;
        border-radius: 5px;
        box-shadow: 1px 1px 3px 2px rgba(0,0,0,0.25);
        overflow: hidden;
        &:hover {
            border: 1px solid rgb(145, 143, 143);
        }
        .gallery-item {
            img {
                width: 100%;
                height: auto;
            }
            .desc {
                overflow: hidden;
                padding: 5px;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 13px;
            }
            .show-genres{
                font-size: 11px;
                height: 22px;
                color: #b1a6a6;
                overflow: hidden;
            }
            .no-image {
                height: 280px;
                justify-content: center;
                display: flex;
                align-items: center;
                color: #eee;
                span{
                    font-size: 20px;
                }
            }
        }
    }
</style>