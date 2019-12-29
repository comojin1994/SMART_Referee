# coding: utf-8

from pygame import mixer
import tkinter as tk
import tkinter.ttk as ttk
import tkinter.messagebox
from SMART_Referee import judgement
import tensorflow as tf
import pandas as pd

root = tk.Tk()
root.geometry('600x250')
frame = tk.Frame(root, relief='ridge', borderwidth=2)
frame.pack(fill='both', expand=1)
root.title('SMART Referee')
frame.config(background='black')
label = tk.Label(frame, text="SMART Referee", fg="Blue", bg="black", font=('Times 35 bold'))
label.pack(side='top')
# lunge_image = tk.PhotoImage(file="./data/demo/Lunge.png")


def exitt():
    exit()


but1 = tk.Button(frame, padx=5, pady=5, width=45, bg='white', fg='black', text='Start', command=judgement,
                 font=('helvetica 15 bold'))
but1.place(x=20, y=104)

root.mainloop()