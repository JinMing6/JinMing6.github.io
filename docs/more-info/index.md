---
layout: page
title: Meet the Team
description: The development of Vite is guided by an international team.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { core } from '../_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>了解更多</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>关于作者</template>
    <template #members>
      <VPTeamMembers :members="core" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>联系方式</template>
    <template #lead>
      <p>邮箱: response965@163.com</p>
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>微信公众号</template>
    <template #lead>
      <img src="/images/IMG_6735.JPG" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
