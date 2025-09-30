function main() {

    let animalRegex = /^[a-zA-Z]{1,20}$/;
    let genderRegex = /^(male|female)?$/i;
    let ageRegex = /^[1-9][0-9]{0,4}$/;

    let animalUsrInput = prompt('What animal is the superhero most similar to?');
    if (!animalRegex.test(animalUsrInput)) {
        alert("Invalid input: Animal name must be a single word (letters only, max 20 characters).");
    } else {
        let genderUsrInput = prompt('Is the superhero male or female? Leave blank if unknown or other.');
        if (!genderRegex.test(genderUsrInput)) {
            alert("Invalid input: Gender must be 'male', 'female', or left blank.");
        } else {
            let ageUsrInput = prompt('How old is the superhero?');
            if (!ageRegex.test(ageUsrInput)) {
                alert("Invalid input: Age must be a number (max 5 digits, cannot start with 0).");
            } else {
                let description = '';
                let maleRegex = /^male$/i;
                let femaleRegex = /^female$/i;

                if (maleRegex.test(genderUsrInput)) {
                    if (ageUsrInput < '18') {
                        description = 'boy';
                    } else {
                        description = 'man';
                    }
                } else if (femaleRegex.test(genderUsrInput)) {
                    if (ageUsrInput < '18') {
                        description = 'girl';
                    } else {
                        description = 'woman';
                    }
                } else {
                    if (ageUsrInput < '18') {
                        description = 'kid';
                    } else {
                        description = 'hero';
                    }
                }

                let superheroName = `${animalUsrInput}-${description}`
                alert(`The superhero name is: ${superheroName}!`);
            }
        }
    }
}

main()

