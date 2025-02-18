const userFetch = {
    getOrder: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/commande/${id}`);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération de la commande :", error);
            throw error;
        }
    }
};

export default userFetch