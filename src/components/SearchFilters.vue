<template>
  <section class="bg-gray-800">
    <div class="flex justify-between px-4 py-3">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-6 w-6 fill-current text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41l.01-.01zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
        </div>
        <input class="bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2" placeholder="Search by keywords">
      </div>
      <button type="button" class="inline-flex hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4"
        @click="toggle"
        :class="{ 'bg-gray-600': isOpen, 'bg-gray-700': !isOpen }"
      >
        <svg class="h-6 w-6 fill-current text-gray-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"/></svg>
        <span class="ml-1 text-white font-medium">Filters</span>
      </button>
    </div>
    <form v-show="isOpen">
      <fieldset class="px-4 py-4 border-t border-gray-900">
        <div class="flex -mx-2">
          <label class="block w-1/2 px-2">
            <span class="text-sm font-semibold text-gray-500">Bedrooms</span>
            <select class="mt-1 form-select block w-full text-white shadow focus:bg-gray-600">
              <option>4</option>
            </select>
          </label>
          <label class="block w-1/2 px-2">
            <span class="text-sm font-semibold text-gray-500">Bathrooms</span>
            <select class="mt-1 form-select block w-full text-white shadow focus:bg-gray-600">
              <option>2</option>
            </select>
          </label>
        </div>
        <div class="mt-4">
          <label>
            <span class="text-sm font-semibold text-gray-500">Price Range</span>
            <select class="mt-1 form-select block w-full text-white shadow focus:bg-gray-600">
              <option>Up to $2,000/wk</option>
            </select>
          </label>
        </div>
      </fieldset>
      <fieldset class="px-4 py-4 border-t border-gray-900">
        <span class="block text-sm font-semibold text-gray-500">Property Type</span>
        <label class="mt-3 flex items-center">
          <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="house">
          <span class="ml-2 text-white">House</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="apartment">
          <span class="ml-2 text-white">Apartment</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="loft">
          <span class="ml-2 text-white">Loft</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-radio bg-gray-900 focus:bg-gray-700" type="radio" name="propertyType" value="townhouse">
          <span class="ml-2 text-white">Townhouse</span>
        </label>
      </fieldset>
      <fieldset class="px-4 py-4 border-t border-gray-900">
        <span class="block text-sm font-semibold text-gray-500">Amenities</span>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="balcony">
          <span class="ml-2 text-white">Balcony</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="airConditioning">
          <span class="ml-2 text-white">Air conditioning</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="pool">
          <span class="ml-2 text-white">Pool</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="beach">
          <span class="ml-2 text-white">Beach</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="petFriendly">
          <span class="ml-2 text-white">Pet friendly</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="kidFriendly">
          <span class="ml-2 text-white">Kid friendly</span>
        </label>
        <label class="mt-3 flex items-center">
          <input class="form-checkbox bg-gray-900 focus:bg-gray-700" type="checkbox" name="parking">
          <span class="ml-2 text-white">Parking</span>
        </label>
      </fieldset>
      <div class="bg-gray-900 px-4 py-4">
        <button class="block w-full bg-indigo-500 hover:bg-indigo-400 font-semibold text-white px-4 py-2 rounded-lg">Update results</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>
