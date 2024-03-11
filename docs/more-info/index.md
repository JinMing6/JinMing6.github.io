---
layout: page
title: 了解更多
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
</VPTeamPage>
