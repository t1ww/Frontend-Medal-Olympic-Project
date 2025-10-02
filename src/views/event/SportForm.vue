<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';
import SportService from '@/services/SportsService';
import CountrySportService from '@/services/CountrySportService';
import { useRouter, useRoute } from 'vue-router';
import type { Sports } from '@/types';
import BaseSelect from '@/components/BaseSelect.vue';

export default defineComponent({
  name: 'SportForm',
  components: { BaseSelect },
  props: {
    countryId: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  setup(props) {
    const selectedSportId = ref<number | null>(null);
    const sportsOptions = ref<Sports[]>([]);
    const existingCountrySports = ref<number[]>([]);
    const bronze = ref(0);
    const silver = ref(0);
    const gold = ref(0);

    const route = useRoute();
    const router = useRouter();

    const countryId = props.countryId; // Use countryId from props

    const fetchSports = async () => {
      try {
        const sportsResponse = await SportService.getSports();
        sportsOptions.value = sportsResponse.data;

        const countrySportsResponse = await CountrySportService.getCountrySports();
        console.log('Fetched Country Sports:', countrySportsResponse.data);

        // Filter the sports specific to the selected country
        const filteredSports = countrySportsResponse.data.filter(
          (sport: any) => sport.countryId === countryId
        );

        // Map to extract only the sport IDs for this country
        existingCountrySports.value = filteredSports.map((sport: any) => sport.sportId);
        console.log('Existing Country Sport IDs:', existingCountrySports.value);
      } catch (error) {
        console.error('Unable to load sports:', error);
        alert('❌ Failed to load sports.');
      }
    };

    const submitForm = async () => {
      if (!selectedSportId.value) {
        alert('❌ Please select a sport.');
        return;
      }

      if (existingCountrySports.value.includes(selectedSportId.value)) {
        alert('❌ Error: This sport is already added for this country.');
        return;
      }

      try {
        const payload = {
          countryId: countryId,
          sportId: selectedSportId.value,
          gold: gold.value,
          silver: silver.value,
          bronze: bronze.value,
        };

        console.log('Submitting payload:', payload);

        // Save the new country sport and update medals and ranks
        await CountrySportService.save(payload);
        alert('✅ Sport added and medals updated successfully!');
        router.push({ name: 'country-detail-view', params: { id: countryId } });

      } catch (error) {
        console.error('Error submitting form:', error);
        alert('❌ An error occurred while submitting the form.');
      }
    };

    onMounted(() => {
      fetchSports();
    });

    return {
      sportsOptions,
      existingCountrySports,
      selectedSportId,
      bronze,
      silver,
      gold,
      submitForm,
    };
  },
});
</script>

<template>
  <div class="sport-form">
    <div class="flex flex-col justify-between items-center mb-3 mt-5">
      <h1 class="text-5xl font-bold text-center text-[#08D9D6]">SPORT FORM</h1>
    </div>
    <div class="flex flex-col justify-between items-center mb-3">
      <h1 class="text-xl font-bold text-center text-[#08D9D6]">Add Sport for Country ID: <span class="px-3 py-2 text-[#EAEAEA] border border-[#EAEAEA] rounded">{{ countryId }}</span></h1>
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <BaseSelect
        label="Select Sport"
        :options="sportsOptions"
        :existingSports="existingCountrySports" 
        v-model="selectedSportId"
        class="focus:ring-2 focus:ring-[#08D9D6]"
      />
      </div>
      <div class="form-group">
        <label for="bronze">Bronze Medals:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="number" id="bronze" placeholder="Bronze Medals" v-model="bronze" required />
      </div>
      <div class="form-group">
        <label for="silver">Silver Medals:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="number" id="silver" placeholder="Silver Medals" v-model="silver" required />
      </div>
      <div class="form-group">
        <label for="gold">Gold Medals:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="number" id="gold" placeholder="Gold Medals" v-model="gold" required />
      </div>
      <button class="w-full my-7 px-5 py-3 bg-[#FF2E63] text-[#EAEAEA] rounded hover:bg-[#FF4B7E]" type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.sport-form {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
}

</style>
