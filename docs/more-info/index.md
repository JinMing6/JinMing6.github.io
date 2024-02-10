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
</VPTeamPage>
