<template>
  <div
    class="aside max-sm:hidden z-99 h-full py-1"
  >
    <t-menu
      v-model:expanded="openKeys"
      v-model:value="selectedKey"
      :collapsed="collapsed"
    >
      <template v-for="item in constRoutes">
        <t-menu-item
          v-if="item.children && item.children.length == 1"
          :key="item.redirect"
          :title="item.name"
          :value="item.redirect"
          @click="jumpTo(item.redirect)"
        >
          <template #icon>
            <component :is="item.icon" class="h-1em pr-2" />
          </template>
          {{ item.name }}
          </t-menu-item>
          <t-submenu
            v-else-if="item.children && item.children.length > 1"
            :key="item.path"
            :title="item.name"
            :value="item.path"
            @click="titleClick(item.path)"
          >
            <template #icon>
              <component :is="item.icon" class="h-1em pr-2" />
            </template>
            <t-menu-item
              v-for="route in item.children"
              :key="`${item.path}/${route.path}`"
              :title="route.meta.name"
              :value="`${item.path}/${route.path}`"
              @click="jumpTo(`${item.path}/${route.path}`)"
            >
              <template #icon>
                <component :is="route.icon" class="h-1em pr-2" />
              </template>
              {{ route.meta.name }}
            </t-menu-item>
          </t-submenu>
      </template>
    </t-menu>

    <div class="collapsed-btn text-xl font-bold" @click="collapsed = !collapsed">
      <AltArrowLeftLinearIcon v-show="!collapsed" />
      <AltArrowRightLinearIcon v-show="collapsed" />
    </div>
  </div>
</template>

<script setup>
import AltArrowLeftLinearIcon from '@iconify-vue/solar/alt-arrow-left-linear'
import AltArrowRightLinearIcon from '@iconify-vue/solar/alt-arrow-right-linear'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { constRoutes } from '@/router/index.js'

const router = useRouter()
const route = useRoute()
let openKeys = ref([localStorage.getItem('menu-openkey')]) // 展开哪个tab
let selectedKey = ref(route.path) // 选中哪个item
let collapsed = ref(false) // 折叠aside

watch(() => route.path, (newPath, oldPath) => {
  // console.log(`从 ${oldPath} 变到了 ${newPath}`)
  selectedKey.value = newPath
})

// 根据屏幕大小实时调整aside宽度
let shrink = !collapsed.value
let magnify = collapsed.value
function dynamicCollapsed() {
  // 只触发一次
  if (window.innerWidth < 888 && !shrink) {
    collapsed.value = true
    magnify = false
    shrink = true
  }
  if (window.innerWidth >= 888 && !magnify) {
    collapsed.value = false
    magnify = true
    shrink = false
  }
}

function titleClick(openkey) {
  localStorage.setItem('menu-openkey', openkey)
}

onMounted(() => {
  dynamicCollapsed()
  window.addEventListener('resize', dynamicCollapsed)
})

onUnmounted(() => {
  window.removeEventListener('resize', dynamicCollapsed)
})

function jumpTo(path) {
  router.push(path)
}
 </script>

<style lang="scss" scoped>
.aside {
  background: var(--theme-bgSecondary);
  position: relative;

  --td-bg-color-container: transparent;

  :deep(.ant-menu-sub) {
    background: transparent !important;
  }

  .ant-menu-root {
    border-inline-end: none;
  }
}

.collapsed-btn {
  position: absolute;
  inset-block-start: 18px;
  z-index: 101;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 40px;
  inset-inline-end: -13px;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--theme-color);
  background-color: var(--theme-background);
  box-shadow:
    0 2px 8px -2px rgba(0, 0, 0, 0.05),
    0 1px 4px -1px rgba(25, 15, 15, 0.07),
    0 0 1px 0 rgba(0, 0, 0, 0.08);

  :deep(svg) {
    width: 0.8em;
  }
}
</style>
