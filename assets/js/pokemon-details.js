document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todas as abas
    var tabs = document.querySelectorAll('.menuDetailsPokemon li');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function(e) {
            e.preventDefault();
            var activeTab = document.querySelector('.menuDetailsPokemon li.active');
            var activeSection = document.querySelector('article section.active');

            // Remove a classe 'active' da aba e da seção atualmente ativas
            if (activeTab) { activeTab.classList.remove('active'); }
            if (activeSection) { activeSection.classList.remove('active'); }

            // Adiciona a classe 'active' à aba clicada
            this.classList.add('active');
            // Pega o href do link dentro da aba para saber qual seção mostrar
            var link = this.querySelector('a').getAttribute('href');
            // Mostra a seção correspondente
            var matchingSection = document.querySelector(link);
            if (matchingSection) {
                matchingSection.classList.add('active');
            }
        });
    }
});