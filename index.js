import { catsData } from '/data.js'

const emotionRadiosEl = document.getElementById('emotion-radios')
const gifsOnlyOptionEl = document.getElementById('gifs-only-option')
const getImageBtnEl = document.getElementById('get-image-btn')
const modalEl = document.getElementById('modal')
const modalContainerEl = document.getElementById('modal-container')
const modalCloseBtnEl = document.getElementById('modal-close-btn')
const catImgContainerEl = document.getElementById('cat-img-container')

emotionRadiosEl.addEventListener('change', highlightCheckedOption)

getImageBtnEl.addEventListener('click', renderCat)

modalCloseBtnEl.addEventListener('click', closeModal)

modalEl.addEventListener('click', e => {
    if (!modalContainerEl.contains(e.target))
        closeModal()
})

renderEmotionsRadios(catsData)

function highlightCheckedOption(e) {
    const prevHighlight = document.querySelector('.highlight')
    prevHighlight && prevHighlight.classList.remove('highlight')
    e.target.parentElement.classList.add('highlight')
}

function renderCat() {
    if (!document.querySelector('input[name="emotions"]:checked'))
        return alert('Please, select an emotion.')

    const { image, alt } = getSingleCatObject()

    catImgContainerEl.innerHTML = `
<img 
    class="cat-img" 
    src="./images/${image}"
    alt="${alt}">`

    modalEl.showModal()
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    const randomNumber = Math.floor(Math.random() * catsArray.length)

    return catsArray[randomNumber]
}

function getMatchingCatsArray() {
    const selectedEmotion = document.querySelector('input[name="emotions"]:checked')
    const isGif = gifsOnlyOptionEl.checked

    return catsData.filter(cat => {
        const hasTag = cat.emotionTags.includes(selectedEmotion.value)
        return isGif ? hasTag && cat.isGif : hasTag
    })
}

function closeModal() {
    modalEl.close()
}

function renderEmotionsRadios(cats) {
    let radioItems = ''
    const emotions = getEmotionsArray(cats)

    for (let emotion of emotions) {
        radioItems += `
<label for="${emotion}" class="radio">
    ${emotion}
    <input
        id="${emotion}"
        value="${emotion}"
        type="radio"
        name="emotions">
</label>`
    }

    emotionRadiosEl.innerHTML = radioItems
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion))
                emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}
