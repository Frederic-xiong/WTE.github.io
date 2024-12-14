let currentMood = '';

document.addEventListener('DOMContentLoaded', function() {
    // Get references to buttons
    const generateButton = document.getElementById('generateButton');
    const nextRecipeButton = document.getElementById('nextRecipe');
    const moodButtons = document.querySelectorAll('.mood-btn');

    // Add click handlers to mood buttons
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Store the selected mood
            currentMood = this.getAttribute('data-mood');
            
            // Enable the generate button
            generateButton.removeAttribute('disabled');
            generateButton.classList.add('enabled');
        });
    });

    // Add click handler to generate button
    generateButton.addEventListener('click', function() {
        if (currentMood) {
            showRandomRecipe();
            nextRecipeButton.style.display = 'block';
        }
    });

    // Add click handler to next recipe button
    nextRecipeButton.addEventListener('click', showRandomRecipe);
});

function showRandomRecipe() {
    const recipes = recipeDatabase[currentMood];
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    
    const resultsDiv = document.getElementById('recipe-results');
    
    resultsDiv.innerHTML = `
        <div class="recipe-card">
            <img src="${randomRecipe.image}" alt="${randomRecipe.name}" class="recipe-image" 
                 onerror="this.src='https://via.placeholder.com/400x300?text=Delicious+Recipe'">
            <div class="recipe-info">
                <span class="mood-label">${currentMood.toUpperCase()}</span>
                <h3>${randomRecipe.name}</h3>
                <p class="description">${randomRecipe.description}</p>
                
                <div class="recipe-details">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${randomRecipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    
                    <h4>Instructions:</h4>
                    <ol>
                        ${randomRecipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
                    </ol>
                    
                    <div class="nutrition-info">
                        <h4>Nutrition Information:</h4>
                        <p>Calories: ${randomRecipe.nutrition.calories}</p>
                        <p>Protein: ${randomRecipe.nutrition.protein}</p>
                        <p>Carbs: ${randomRecipe.nutrition.carbs}</p>
                        <p>Fat: ${randomRecipe.nutrition.fat}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
