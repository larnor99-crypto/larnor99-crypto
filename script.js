// 1. Funksjon for Mørkt Modus
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// 2. Funksjon for Oppsigelseskalkulator
function beregnSlutt() {
    const datoInput = document.getElementById('oppsigelsesDato').value;
    if (!datoInput) return alert("Velg en dato først!");

    let dato = new Date(datoInput);
    // Legg til 3 måneder
    dato.setMonth(dato.getMonth() + 3);
    // Sett til siste dag i den måneden
    let sisteDag = new Date(dato.getFullYear(), dato.getMonth() + 1, 0);

    document.getElementById('resultat').innerHTML = 
        "Arbeidsforholdet avsluttes: " + sisteDag.toLocaleDateString('no-NO');
}

// 3. Funksjon for å lagre API-nøkkel lokalt i nettleseren
function saveKey() {
    const key = document.getElementById('userApiKey').value;
    if (!key) return alert("Vennligst lim inn en nøkkel!");
    
    localStorage.setItem('gemini_key', key);
    alert("Nøkkelen er lagret lokalt! Du kan nå bruke chatboten.");
    document.getElementById('apiSection').classList.add('d-none');
}

// 4. Funksjon for å snakke med Gemini AI
async function askAI() {
    const input = document.getElementById('aiInput').value;
    const responseDiv = document.getElementById('aiResponse');
    const API_KEY = localStorage.getItem('gemini_key');
    
    if (!API_KEY) return alert("Du må legge inn en API-nøkkel under 'Innstillinger' først!");
    if (!input) return alert("Vennligst skriv noe først!");

    responseDiv.classList.remove('d-none');
    responseDiv.innerHTML = "<em>Tenker... ⚖️</em>";

   try {
        // Vi bruker 'v1beta' og 'gemini-1.5-flash' - dette er den vanligste kombinasjonen nå
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: "Du er en juridisk assistent. Svar på norsk: " + input 
                    }] 
                }]
            })
        });

        const data = await response.json();
        
        // Dette hjelper oss å se nøyaktig hva feilen er i Console hvis det stopper
        if (data.error) {
            console.error("Google API Error:", data.error);
            throw new Error(data.error.message);
        }

        const aiText = data.candidates[0].content.parts[0].text;
        responseDiv.innerText = aiText;

    } catch (error) {
        responseDiv.innerHTML = `<span class="text-danger">Beskjed fra Google: ${error.message}</span>`;
    }