<script lang="ts">
import { defineComponent, ref } from 'vue';
import CountryService from '@/services/CountryService';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CountryForm',
  setup() {
    const name = ref('');
    const code = ref('');
    const flagUrl = ref('');
    const gold = ref(0);
    const silver = ref(0);
    const bronze = ref(0);
    const ranking = ref(0);
    const capital = ref('');
    const population = ref(0);
    const area = ref('');
    const continent = ref('');
    const nationalLanguage = ref('');
    const totalMedals = ref(0);
    const flagImage = ref<File | null>(null);
    const flagImagePreview = ref('');
    const fileInput = ref<HTMLInputElement | null>(null);

    const router = useRouter();

    const onDrop = (event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        onFileSelected({ target: { files } } as any);
      }
    };

    const onFileSelected = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        flagImage.value = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          flagImagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(files[0]);
      }
    };

    const triggerFileInput = () => {
      fileInput.value?.click();
    };

    const submitForm = async () => {
  try {
    let uploadedUrl = '';

    // Handle file upload if an image is selected
    if (flagImage.value) {
      uploadedUrl = await CountryService.uploadFile(flagImage.value);
      flagUrl.value = uploadedUrl; // Set the uploaded URL to flagUrl
    }

    // Save the country with the uploaded flag URL
    await CountryService.saveCountry({
      name: name.value,
      code: code.value,
      flagUrl: flagUrl.value,
      gold: gold.value,
      silver: silver.value,
      bronze: bronze.value,
      ranking: ranking.value,
      capital: capital.value,
      population: population.value,
      area: area.value,
      continent: continent.value,
      nationalLanguage: nationalLanguage.value,
      totalMedals: totalMedals.value,
      countrySports: [],
    });

    alert('✅ Country added successfully!');
    router.push({ name: 'medal-list-view' }); // Redirect to the medal list view

    // Reset form fields
    resetForm();
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('❌ An error occurred while submitting the form.');
  }
};

// Helper function to reset the form
const resetForm = () => {
  name.value = '';
  code.value = '';
  flagUrl.value = '';
  gold.value = 0;
  silver.value = 0;
  bronze.value = 0;
  ranking.value = 0;
  capital.value = '';
  population.value = 0;
  area.value = '';
  continent.value = '';
  nationalLanguage.value = '';
  flagImage.value = null;
  flagImagePreview.value = '';
};

    return {
      name,
      code,
      flagUrl,
      capital,
      population,
      area,
      continent,
      nationalLanguage,
      flagImage,
      flagImagePreview,
      fileInput,
      onDrop,
      onFileSelected,
      triggerFileInput,
      submitForm,
    };
  },
});
</script>

<template>
  <div class="country-form">
    <div class="flex flex-col justify-between items-center mb-3 mt-5">
      <h1 class="text-5xl font-bold text-center text-[#08D9D6]">COUNTRY FORM</h1>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Country Name:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="text" id="name" placeholder="Country Name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="code">Country Code:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="text" id="code" placeholder="Country Code" v-model="code" required />
      </div>

      <div class="form-group">
        <label for="flagImage">Flag Image:</label>
        <div class="dropzone" @dragover.prevent @drop.prevent="onDrop">
          <input
            type="file"
            id="flagImage"
            @change="onFileSelected"
            accept="image/*"
            style="display: none;"
            ref="fileInput"
          />
          <p v-if="!flagImage">Drag and drop an image here or click to select</p>
          <img v-else :src="flagImagePreview" alt="Flag preview" style="max-width: 200px;" />
        </div>
        <button @click="triggerFileInput" class="m-5 px-5 py-3 bg-[#FF2E63] text-[#EAEAEA] rounded hover:bg-[#FF4B7E]">Select Image</button>
      </div>

      <div class="form-group">
        <label for="capital">Capital:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="text" id="capital" placeholder="Capital" v-model="capital" required />
      </div>

      <div class="form-group">
        <label for="population">Population:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="number" id="population" placeholder="Population" v-model="population" required />
      </div>

      <div class="form-group">
        <label for="area">Area:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="number" id="area" placeholder="Area (sq km)" v-model="area" required />
      </div>

      <div class="form-group">
        <label for="continent">Continent:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="text" id="continent" placeholder="Continent" v-model="continent" required />
      </div>

      <div class="form-group">
        <label for="nationalLanguage">National Language:</label>
        <input class="focus:ring-2 focus:ring-[#08D9D6]" type="text" id="nationalLanguage" placeholder="National Language(s)" v-model="nationalLanguage" required />
      </div>

      <button class="w-full my-7 px-5 py-3 bg-[#FF2E63] text-[#EAEAEA] rounded hover:bg-[#FF4B7E]" type="submit"> Submit</button>
    </form>
  </div>
</template>


<style scoped>
.country-form {
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
  color:black;
}

.dropzone {
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
