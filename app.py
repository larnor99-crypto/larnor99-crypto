import streamlit as st

st.title("⚖️ Juridisk AI-Dashboard")
st.write("Velkommen! Lim inn tekst under for en rask analyse.")

# En tekstboks for inndata
juridisk_tekst = st.text_area("Lim inn kontraktsklausul her:", "Dette er en hemmelig avtale...")

# En knapp for å starte analysen
if st.button("Analyser nå"):
    st.info("Kobler til AI-motor...")
    
    # Her simulerer vi logikken din fra tidligere
    if "hemmelig" in juridisk_tekst.lower():
        st.warning("⚠️ Obs! Dokumentet inneholder konfidensialitetsklausuler.")
    else:
        st.success("✅ Ingen kritiske nøkkelord funnet umiddelbart.")
        
    st.write("Analyse ferdigstilt kl. 18:26 (simulert).")