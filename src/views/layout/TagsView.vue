<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''"
                   v-for="tag in Array.from(visitedViews)"
                   :to="tag.path"
                   @contextmenu.prevent.native="openMenu(tag, $event)">
        {{generateTitle(tag.title)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </div>
    <ul class='context-menu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>
<script>
  import {generateTitle} from '@/utils/i18n'

  export default {
    data() {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews;
      }
    },
    watch: {
      '$route'() {
        this.addViewTags();
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      generateTitle,
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name;
      },
      addViewTags() {
        const route = this.generateRoute();

        if (!route) {
          return false
        }
        this.$store.commit('addView', route);
      },
      closeSelectedTag(view) {
        this.$store.dispatch('delView', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0];
            if (latestView) {
              this.$router.push(latestView.path);
            } else {
              this.$router.push('/');
            }
          }
        })
      },
      closeOthersTags() {
        this.$router.push(this.selectedTag.path);
        this.$store.dispatch('delOtherView', this.selectedTag).then(() => {
          // this.moveToCurrentTag()
        })
      },
      closeAllTags() {
        this.$store.dispatch('delAllView');
        this.$router.push('/')
      },
      openMenu(tag, e) {
        console.log(e);
        console.log(tag);
        this.visible = true;
        this.selectedTag = tag;
        this.left = e.layerX;
        this.top = e.layerY;
      },
      closeMenu() {
        this.visible = false
      }
    }

  }
</script>
<style scoped>
  .tags-view-container {
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }

  .tags-view-wrapper {
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    position: absolute;
    text-align: left;
  }

  a {
    text-decoration: none
  }

  /**右键菜单*/
  .context-menu {
    display: block;
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  }

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
  }

  li:hover {
    background: #eee;
  }

  /**tags*/
  .tags-view-item {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
  }

  .tags-view-item:first-of-type {
    margin-left: 15px;
  }

  .tags-view-item.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
  }

  .tags-view-item::before {
    content: '';
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
</style>
