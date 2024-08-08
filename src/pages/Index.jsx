import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, Paw, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CatBreed = ({ name, description, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Unliked" : "Liked!",
      description: `You've ${isLiked ? 'unliked' : 'liked'} the ${name} breed.`,
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="mb-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleLike}>
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </Button>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catFact, setCatFact] = useState("");
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive coloring and vocal nature." },
    { name: "Maine Coon", description: "Large, gentle giants with long, fluffy coats." },
    { name: "Persian", description: "Recognizable by their flat faces and long, luxurious fur." },
    { name: "Bengal", description: "Wild-looking cats with leopard-like spots or marbling." },
    { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and affectionate personality." },
    { name: "Russian Blue", description: "Elegant cats with a silvery-blue coat and green eyes." },
    { name: "Scottish Fold", description: "Distinctive for their folded ears and round faces." },
  ];

  const filteredBreeds = catBreeds.filter(breed =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
  ];

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => setCatFact(data.fact));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          Fantastic Felines
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h3 className="text-2xl font-semibold mb-2 text-purple-800">Did You Know?</h3>
          <p className="text-lg text-gray-700">{catFact || "Loading cat fact..."}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl text-gray-700 mb-8 text-center"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with unique characteristics
          and personalities.
        </motion.p>

        <div className="mb-6">
          <h2 className="text-4xl font-semibold mb-4 text-center text-purple-800">Discover Cat Breeds</h2>
          <div className="flex items-center justify-center mb-4">
            <Input
              type="text"
              placeholder="Search cat breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm mr-2"
            />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {filteredBreeds.map((breed, index) => (
            <CatBreed key={breed.name} name={breed.name} description={breed.description} index={index} />
          ))}
        </AnimatePresence>

        {filteredBreeds.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-600 mt-4"
          >
            No cat breeds found. Try a different search term.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Index;
