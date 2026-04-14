import streamlit as st
from pypdf import PdfReader

st.title("⚖️ Juridisk Risiko-Analysator")

opplastet_fil = st.file_uploader("Last opp PDF for risikoanalyse", type=["pdf"])

if opplastet_fil is not None:
    # Les PDF
    leser = PdfReader(opplastet_fil)
    tekst = ""
    for side in leser.pages:
        tekst += side.extract_text()
    
    st.success("Dokumentet er ferdig lest!")

    # --- AI-LOGIKK (REGELMOTOR) ---
    st.subheader("Analyse-resultater")
    
    # Vi definerer hva vi leter etter og hvorfor
    risiko_sjekk = {
        "Konkurranseklausul": ["karantene", "konkurranseforbud", "karantenetid"],
        "Taushetsplikt": ["konfidensialitet", "taushet", "NDA"],
        "Oppsigelse": ["oppsigelsesfrist", "fratredelse", "avskjed"],
        "Lovvalg": ["verneting", "lovvalg", "voldgift"]
    }

    funn = []
    for kategori, nøkkelord in risiko_sjekk.items():
        for ord in nøkkelord:
            if ord in tekst.lower():
                funn.append({"Kategori": kategori, "Treff på ord": ord, "Status": "⚠️ Sjekk nærmere"})
                break # Gå til neste kategori hvis vi finner ett treff

    if funn:
        st.table(funn)
    else:
        st.balloons()
        st.success("Ingen kritiske nøkkelord funnet i denne omgang!")

    with st.expander("Se hele teksten"):
        st.write(tekst)