const filteredRows = computed(() => {
    const filterString = filter.value.toLowerCase()
    return rows.value.filter(row => 
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(filterString)
      )
    )
  })