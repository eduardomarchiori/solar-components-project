<template>
  <section class="bg-primary">
    <div class="flex justify-center py-20">
      <div class="w-6/12 text-center">
        <h2 class="text-2xl font-bold mb-2 color-tertiary">Common questions</h2>
        <span class="text-md color-tertiary">See below questions that some customers have already had.</span>
        <div class="mt-12">
          <div v-for="c of question" :key="c.id">
            <div class="flex justify-between mb-2" @click="c.expanded = !c.expanded">
              <div class="color-tertiary">
                <b>{{ c.title }}</b>
              </div>
              <div class="cursor-pointer">
                <fa-icon v-if="c.expanded" icon="angle-up" class="color-tertiary" />
                <fa-icon v-else icon="angle-down" class="color-tertiary" />
              </div>
            </div>
            <div class="text-left mb-4 color-tertiary" v-if="c.expanded">
              {{ c.awnser }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    question: [
      {
        id: 1,
        title: 'How to work the Falcon Bot?',
        awnser: 'lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip amet amet, consectetur adip lorem amet, consectetur adip lorem',
        expanded: false,
      },
      {
        id: 2,
        title: 'How to work the Falcon Bot?',
        awnser: 'lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip amet amet, consectetur adip lorem amet, consectetur adip lorem',
        expanded: false,
      },
      {
        id: 3,
        title: 'How to work the Falcon Bot?',
        awnser: 'lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip amet amet, consectetur adip lorem amet, consectetur adip lorem',
        expanded: false,
      },
      {
        id: 4,
        title: 'How to work the Falcon Bot?',
        awnser: 'lorem ipsum dolor sit amet, consectetur adip amet, consectetur adip amet amet, consectetur adip lorem amet, consectetur adip lorem',
        expanded: false,
      }
    ]
  })
}
</script>