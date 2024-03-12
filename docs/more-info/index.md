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
  <VPTeamPageSection>
    <template #title>关于作者</template>
    <template #members>
      <VPTeamMembers :members="core" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
