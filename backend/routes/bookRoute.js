import express from "express";

import { Book } from "../models/bookModel.js";
const router =express.Router();


//ADD BOOK
router.post('/',async(req,res)=>{
    try {
        if(
            !req.body.title||
            !req.body.author||
                !req.body.publishYear
        ){
            return res.send(404).send("Enter all details")
        }

        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        
        const book=await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
})

//get all books from database
router.get('/',async (req,res)=>{
    try {
        const books =await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log("message:"+error.message);
        res.status(500).send({message:error.message});
    }
})

//get one book by id
router.get('/:id',async (req,res)=>{
    try {

        const{id}=req.params;

        const book =await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log("message:"+error.message);
        res.status(500).send({message:error.message});
    }
})

//UPDATE BOOK 

router.put('/:id',async (req,res)=>{
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({message:"send all details"})
        } else {
            const {id}=req.params;
            const result=await Book.findByIdAndUpdate(id,req.body);

            if(!result){
                return res.status(404).send({message:"book not found"});
            }

            return res.status(200).send({message:"Book updated successfully"});

        }
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})


//DELETE BOOK
router.delete('/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const result=await Book.findOneAndDelete(id);
        if(!res){
            return res.status(500).send({message:"book not found"});
        }

        return res.status(200).send({message:"book deleted"})
            
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
})


export default router;