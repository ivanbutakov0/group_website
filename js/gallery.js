/**
 * Handles the click event on an image in the gallery.
 *
 * @param {number} imageId - The index of the clicked image in the gallery.
 * @param {galleryByrdin, galleryTatar} gallery - The gallery name.
 * @return {void} This function does not return a value.
 */
const handleImageClick = (imageId, gallery) => {
	const mainImage = document.getElementById('main-image')
	const description = document.getElementById('description')

	mainImage.src = gallery[imageId].imageSrc
	description.textContent = gallery[imageId].description

	manipulateClass('gallery__photos-container', 'add', 'filter-gray')
	manipulateClass('gallery__photos-container', 'remove', 'filter-gray', imageId)
}

/**
 * Manipulates classes of elements within a container.
 *
 * @param {string} containerClass - The class name of the container element.
 * @param {string} targetAction - "add" or "remove" to specify the action.
 * @param {string} className - Class name to add or remove.
 * @param {number} target (optional) - Required only for "remove" action, the index of the element to target.
 */
const manipulateClass = (containerClass, targetAction, className, target) => {
	// Get the container element(s) using querySelectorAll
	const container = document.querySelectorAll(`.${containerClass}`)

	container.forEach(containerElement => {
		// Early exit if container is empty (prevents unnecessary DOM lookups)
		if (!containerElement.querySelectorAll('*').length) return

		const action = targetAction.toLowerCase() // Ensure case-insensitive action

		switch (action) {
			case 'add':
				if (!className) {
					console.error("Class name is required for 'add' action")
					return
				}
				containerElement
					.querySelectorAll('*')
					.forEach(descendant => descendant.classList.add(className))
				break
			case 'remove':
				const element = containerElement.querySelectorAll('*')[target]
				if (element) {
					if (element.classList.contains(className)) {
						element.classList.remove(className)
					} else {
						console.log(
							`Class: ${className} not found on element with index: ${target}`
						)
					}
				} else {
					console.log(
						`Element with index: ${target} not found within the container`
					)
				}
				break
			default:
				console.error(`Invalid target action: ${targetAction}`)
		}
	})
}
