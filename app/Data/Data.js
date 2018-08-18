import firebase from 'firebase';

export const getGuide = async () => {
    let guides =[]
    await firebase.database().ref(`guides`).once('value', snapshot => {
        snapshot.forEach(element => {
            guides.push({
                key: element.key,
                value: element.val()
            });
        })
    })
    return guides.reverse()
}

export const saveFavorite = async (guideKey) => {
    return await firebase.database().ref(`profiles/${firebase.auth().currentUser.uid}/favoriteGuides`).push(guideKey);
}

export const postGuide = async (info) => {
    return await firebase.database().ref(`guides`).push(info);
}

export const getFavoriteGuides = async () => {
    let guideKeys =[]
    await firebase.database().ref(`profiles/${firebase.auth().currentUser.uid}/favoriteGuides`).once('value', snapshot => {
        snapshot.forEach(element => {
            console.log(element.val())
            guideKeys.push(element.val());
        })
    })
    console.log(guideKeys)

    let favoriteGuides = []
    await firebase.database().ref(`guides`).once('value', snapshot => {
        snapshot.forEach(element => {
            if(guideKeys.includes(element.key)) {
                favoriteGuides.push({
                    key: element.key,
                    value: element.val()
                });
            }
        })
    })
    return favoriteGuides.reverse()
}