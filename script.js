
        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
        }

        function beregnSlutt() {
            const datoInput = document.getElementById('oppsigelsesDato').value;
            if(!datoInput) return alert("Velg en dato først!");

            let dato = new Date(datoInput);
            // Legg til 3 måneder
            dato.setMonth(dato.getMonth() + 3);
            // Sett til siste dag i den måneden
            let sisteDag = new Date(dato.getFullYear(), dato.getMonth() + 1, 0);
            
            document.getElementById('resultat').innerHTML = 
                "Arbeidsforholdet avsluttes: " + sisteDag.toLocaleDateString('no-NO');
        }
    