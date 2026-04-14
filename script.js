
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
 function askAI() {
    const input = document.getElementById('aiInput').value;
    const responseDiv = document.getElementById('aiResponse');
    
    if(!input) return alert("Vennligst skriv noe først!");

    responseDiv.classList.remove('d-none');
    responseDiv.innerHTML = "<em>Tenker... (Kobler til Gemini)</em>";
    
    console.log("Bruker spurte om:", input);
    // Her skal vi straks legge inn den faktiske koblingen til API-en
}   