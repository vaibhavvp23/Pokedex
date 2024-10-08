import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons, useGetPokemonDetails } from '../../hooks/useGetPokemons';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const { pokemonDetails } = useGetPokemonDetails(props.selectedValue);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} className={classes.dialogStyle}>
      <DialogTitle>{pokemonDetails?.name}</DialogTitle>
      <img title='Pokemon' src={pokemonDetails?.image} />
      <div>Number: {pokemonDetails?.number}</div>
      <div>Weaknesses:
        <ul>
          {pokemonDetails?.weaknesses?.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>
      <div>Resistant:
        <ul>
          {pokemonDetails?.resistant?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  const search_parameters = Object.keys(Object.assign({}, ...pokemons));
  const [query, setQuery] = useState("");

  function search(data: any) {
    return data.filter((data: any) =>
      search_parameters.some((parameter) =>
        data[parameter].toString().toLowerCase().includes(query)
      )
    );
  }

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = (event: any) => {
    setSelectedValue(event.target.id);
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };


  return (
    <div>
      <div className={classes.inputBox}>
        <label>Search Pokemon: </label>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pokemon name"
        />
      </div>

      <div className={classes.root}>
        {loading && <div>Loading...</div>}
        {search(pokemons).map((pkmn: any) => (
          <div key={pkmn.id} id={pkmn.id} onClick={handleClickOpen}>
            <span><img title='Pokemon' src={pkmn.image} /></span>
            <span><p>{pkmn.name}</p></span>
            <span><p>{pkmn.number}</p></span>
            <span>Types:
              <ul>
                {pkmn.types?.map((r: any, i: any) => (
                  <li key={i}>{r}</li>
                ))}
              </ul></span>
          </div>
        ))}
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'left',
      padding: '32px',
      boxSizing: 'border-box',
      '& div': {
        border: '1px solid grey',
        padding: '15px',
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'justify-content': 'space-between',
        '& img': {
          height: '80px',
          marginRight: '50px'
        },
        '&:hover': {
          background: '#0c0c0c',
          cursor: 'pointer'
        },
        '& span': {
          width: '24%',
          'pointerEvents': 'none'
        }
      },
    },
    inputBox: {
      fontSize: '20px',
      padding: '20px',
      '& input': {
        fontSize: '20px',
        color: '#111111'
      }
    },
    dialogStyle: {
      'MuiPaper-root': {
        width: '200px',
        height: '150px'
      },
      '& img': {
        height: '80px',
        padding: '10px'
      },
      '& div': {
        color: '#0d9ee7',
        padding: '5px'
      },
      '& h2': {
        backgroundColor: '#1e1e1e'
      },
      '& ul': {
        'margin-block-start': '0.2em'
      },
      '& li': {
        color: '#1e1e1e',
      }
    }
  },
  { name: 'PokemonList' }
);
