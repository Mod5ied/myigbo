import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useRecordsStore = defineStore("records", () => {
	const wordRecords = ref([]);
	const dictionaryRecords = ref([]);


    return {
        wordRecords,
        dictionaryRecords
    }
});
