# Vision Crypto web

Ce projet est une landing page pour votre application mobile d'achat, de vente et d'échange de cryptomonnaies. Il est développé en utilisant React TypeScript, la librairie de composants Shadcn UI, et le framework CSS Tailwind CSS.

## Technologies Utilisées

* **[React TypeScript](https://react.dev/) :** Une librairie JavaScript pour la construction d'interfaces utilisateur, avec le typage statique apporté par TypeScript pour une meilleure maintenabilité et détection d'erreurs.
* **[Shadcn UI](https://ui.shadcn.com/) :** Une collection de composants d'interface utilisateur magnifiquement conçus et facilement personnalisables, construits avec Radix UI et Tailwind CSS.
* **[Tailwind CSS](https://tailwindcss.com/) :** Un framework CSS utilitaire-first qui permet de styliser rapidement les éléments HTML en appliquant directement des classes CSS dans le JSX.

## Prérequis

Assurez-vous d'avoir Node.js et npm (ou yarn) installés sur votre machine. Vous pouvez les télécharger depuis [https://nodejs.org/](https://nodejs.org/).

## Installation et Démarrage

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/arison62/vision-crypto.git
    cd vision crypto
    ```

2.  **Installer les dépendances :**
    Avec npm :
    ```bash
    npm install
    ```
    Ou avec yarn :
    ```bash
    yarn install
    ```

3.  **Démarrer le serveur de développement :**
    Avec npm :
    ```bash
    npm run dev
    ```
    Ou avec yarn :
    ```bash
    yarn dev
    ```

    Le site web sera accessible à l'adresse `http://localhost:3000` (ou une autre adresse indiquée dans votre terminal).
## Internationalisation (i18n)

Ce site web supporte actuellement deux langues : l'anglais et le français. L'implémentation de l'internationalisation est gérée via un contexte React personnalisé (`src/context/lang-context.tsx`).

* **Langues Disponibles :** Anglais (`en`) et Français (`fr`). La langue par défaut est déterminée par la langue du navigateur de l'utilisateur.

* **Ressources Linguistiques :** Les fichiers de traduction au format JSON sont situés dans le répertoire `src/assets/langs/`. Vous y trouverez :
    * `en.json` : Contient les traductions pour l'anglais.
    * `fr.json` : Contient les traductions pour le français.

* **Utilisation dans les Composants :**
    1.  **Contexte de Langue :** Les composants accèdent aux traductions via le hook personnalisé `useLang()` importé depuis `src/context/lang-context.tsx`. Ce hook fournit un objet `messages` contenant les traductions pour la langue courante.

    2.  **Attribut `data-lang-id` :** Pour identifier la section de traduction à utiliser dans les fichiers de langue, l'attribut `data-lang-id` est ajouté à l'élément HTML. La valeur de cet attribut correspond à la clé racine dans les fichiers `en.json` ou `fr.json` d'où le composant récupère ses ressources textuelles.

        **Exemple (Basé sur votre composant `Footer`) :**
        Dans votre fichier `en.json` :
        ```json
        {
          "footer": {
            "about": {
              "title": "About Us"
            },
            "newsletter": {
              "title": "Newsletter",
              "input_placeholder": "Your email",
              "button_text": "Subscribe"
            },
            "contact": {
              "title": "Contact"
            },
            "reserved_right": {
              "text": "All rights reserved"
            }
          }
        }
        ```
        Dans votre composant `Footer.tsx` :
        ```jsx
        <footer data-lang-id="footer" className="...">
          <div>
            <h3 className="text-lg font-semibold mb-4">{messages.footer.about.title}</h3>
            {/* ... */}
            <h3 className="text-lg font-semibold mb-4">{messages.footer.newsletter.title}</h3>
            <input
              type="email"
              placeholder={messages.footer.newsletter.input_placeholder}
              className="..."
              required
            />
            <button type="submit" className="...">
              {messages.footer.newsletter.button_text}
            </button>
            {/* ... */}
            <h3 className="text-lg font-semibold mb-4">{messages.footer.contact.title}</h3>
            {/* ... */}
            <p className="text-gray-300 text-sm">
              © {currentYear} {messages.footer.reserved_right.text}
            </p>
          </div>
        </footer>
        ```

        Le hook `useLang()` se charge de récupérer les valeurs correspondantes (par exemple, `messages.footer.about.title`) en fonction de la langue active.
