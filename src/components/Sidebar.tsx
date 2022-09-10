import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { MenuButton } from "./Menu";

const PlaylistButton = ({ name, slug }: { name: string; slug: string }) => {
  const router = useRouter();

  return (
    <div className="p-3">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => {
            router.push({
              query: {
                ...router.query,
                p: slug,
              },
            });
          }}
          variant="contained"
        >
          {name}
        </Button>
      </motion.div>
    </div>
  );
};
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              onClick={() => setIsOpen(!isOpen)}
              className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed bg-blue-200 text-white shadow-lg top-0 right-0 h-screen p-5"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white text-black h-8 w-8 block mb-2 rounded-full"
              >
                &times;
              </button>
              <div className="flex flex-col items-center justify-evenly">
                <PlaylistButton name="Solo" slug={"solo"} />
                <PlaylistButton name="Doubles" slug={"doubles"} />
                <PlaylistButton name="Standard" slug={"standard"} />
                <PlaylistButton name="Rumble" slug={"rumble"} />
                <PlaylistButton name="Dropshot" slug={"dropshot"} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
};
//
// export const Sidebar = ({ isOpen }: { isOpen: boolean }) => (
//   <div
//     className="right-0 top-16 p-8"
//     style={{
//       position: "absolute",
//       width: "300px",
//       height: "100vh",
//       zIndex: isOpen ? 999 : 1,
//     }}
//   >
//     <motion.ul variants={variants}>
//       {playlistNames.map((name, i) => (
//         <div className="m-5" key={name}>
//           <MenuItem i={i + 1} name={name} />
//         </div>
//       ))}
//     </motion.ul>
//   </div>
// );
