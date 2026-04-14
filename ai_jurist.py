import time

def simuler_claude_analyse(dokument_tekst):
    print(f"\n[SYSTEM] Sender dokument til Claude API...")
    # Vi simulerer ventetiden det tar for en AI å tenke
    time.sleep(2) 
    
    # Dette er "Liksom-svar" fra Claude
    kunstig_svar = """
    JURIDISK VURDERING (Simulert):
    - Dokumenttype: Arbeidsavtale
    - Risiko: Punkt 4 om konkurranseklausul virker urimelig streng etter norsk rett.
    - Anbefaling: Sjekk opp mot Arbeidsmiljøloven § 14 A-1.
    """
    return kunstig_svar

# --- Her starter selve programmet ditt ---
print("--- VELKOMMEN TIL DIN JURIDISKE AI-ASSISTENT ---")
input_data = "Arbeidsavtale for Ola Nordmann, inkludert 12 måneders karanteneperiode."

resultat = simuler_claude_analyse(input_data)

print("\nSVAR FRA AI:")
print(resultat)
print("---------------------------------------------")