const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Erreur Prisma : contrainte unique violée (ex: email déjà utilisé)
    if (err.code === "P2002") {
        return res.status(409).json({
            message: "A record with this value already exists"
        });
    }

    // Erreur Prisma : enregistrement non trouvé
    if (err.code === "P2025") {
        return res.status(404).json({
            message: "Record not found"
        });
    }

    // Utiliser le statusCode personnalisé s'il existe sur l'erreur
    const status = err.statusCode || 500;
    return res.status(status).json({
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;